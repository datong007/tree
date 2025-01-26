'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ProductColors } from '@/types/product';
import { AppConfig } from '@/config/app-config';

interface ModelViewerProps {
  modelPath?: string;
  selectedColors: ProductColors;
}

export default function ModelViewer({ 
  modelPath = AppConfig.product.defaultModelPath,
  selectedColors 
}: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Set renderer size and add to container
    const containerWidth = containerRef.current.clientWidth;
    renderer.setSize(containerWidth, containerWidth);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Set camera position
    camera.position.z = AppConfig.product.initialCameraPosition[2];

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load 3D model
    if (modelPath) {
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          if (modelRef.current) {
            scene.remove(modelRef.current);
          }
          modelRef.current = gltf.scene;
          scene.add(gltf.scene);
          
          // Scale the model if needed
          gltf.scene.scale.setScalar(AppConfig.product.modelScale);
          
          setIsLoading(false);
          setError(null);
        },
        undefined,
        (error) => {
          console.error('Model loading error:', error);
          setError('模型加载失败');
          setIsLoading(false);
        }
      );
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">3D模型预览</h2>
      <div 
        ref={containerRef} 
        className="relative w-full" 
        style={{ aspectRatio: '1/1' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">加载中...</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
} 