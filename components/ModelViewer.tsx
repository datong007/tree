'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ProductColors } from '@/types/product';
import { AppConfig } from '@/config/app-config';

interface ModelViewerProps {
  className?: string;
  selectedColors: ProductColors;
}

export default function ModelViewer({ 
  className,
  selectedColors 
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // 设置相机
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // 设置渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 添加轨道控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 加载3D模型
    const loader = new GLTFLoader();
    loader.load(
      AppConfig.product.defaultModelPath,
      (gltf) => {
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }
        
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        
        // 自动调整相机位置以适应模型大小
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // 添加一些边距
        camera.position.set(0, 0, cameraZ);
        
        // 更新材质颜色
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const partName = child.name.toLowerCase();
            if (selectedColors[partName]) {
              child.material.color.setStyle(selectedColors[partName]);
            }
          }
        });

        scene.add(model);
        modelRef.current = model;
        setIsLoading(false);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
      },
      (error) => {
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          type: error instanceof Error ? error.constructor.name : 'Unknown type',
          path: AppConfig.product.defaultModelPath
        });
        setError(`模型加载失败: ${error instanceof Error ? error.message : '未知错误'}`);
        setIsLoading(false);
      }
    );

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // 处理窗口大小变化
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  // 当颜色改变时更新模型材质
  useEffect(() => {
    if (!modelRef.current) return;

    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const partName = child.name.toLowerCase();
        if (selectedColors[partName]) {
          child.material.color.setStyle(selectedColors[partName]);
        }
      }
    });
  }, [selectedColors]);

  return (
    <div className={`border rounded-lg p-4 bg-white ${className}`}>
      <h2 className="text-xl font-semibold mb-4">3D 模型预览</h2>
      <div 
        ref={containerRef} 
        className="aspect-square bg-gray-50 rounded-lg"
      >
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">加载中...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        提示：可以用鼠标拖动旋转模型，滚轮缩放
      </div>
    </div>
  );
} 