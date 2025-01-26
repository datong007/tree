import React, { useEffect, useRef } from 'react';
import { ProductColors } from '@/types/product';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

interface ModelViewerProps {
  className?: string;
  selectedColors: ProductColors;
}

export default function ModelViewer({ 
  className,
  selectedColors 
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  const presetViews = [
    { name: '正面', position: { x: 0, y: 0, z: 5 } },
    { name: '背面', position: { x: 0, y: 0, z: -5 } },
    { name: '左侧', position: { x: -5, y: 0, z: 0 } },
    { name: '右侧', position: { x: 5, y: 0, z: 0 } }
  ];

  const handlePresetView = (position: { x: number, y: number, z: number }) => {
    if (!cameraRef.current) return;
    
    gsap.to(cameraRef.current.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1,
      ease: 'power2.inOut'
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 设置相机
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // 设置渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0xffffff);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 添加轨道控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // 加载模型
    const loader = new GLTFLoader();
    loader.load(
      '/models/gltf/shirt.glb',
      (gltf) => {
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }
        modelRef.current = gltf.scene;
        scene.add(gltf.scene);

        // 更新材质颜色
        updateModelColors(selectedColors);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 处理窗口大小变化
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 更新模型颜色
  const updateModelColors = (colors: ProductColors) => {
    if (!modelRef.current) return;

    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const partName = child.name.toLowerCase();
        if (colors[partName]) {
          child.material.color.setStyle(colors[partName]);
        }
      }
    });
  };

  // 当颜色改变时更新模型
  useEffect(() => {
    updateModelColors(selectedColors);
  }, [selectedColors]);

  return (
    <div className={`border rounded-lg p-4 bg-white ${className}`}>
      <h2 className="text-xl font-semibold mb-4">3D 模型预览</h2>
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">3D 模型加载中...</p>
      </div>
    </div>
  );
} 