import { useEffect, useRef, RefObject } from 'react';
import {
  RaycasterState,
} from '../types';
import {
  MAP,
  TEXTURES,
  INITIAL_POS,
  INITIAL_DIR,
  INITIAL_PLANE,
  MOVE_SPEED,
  ROTATION_SPEED
} from '../constants';
import { moveStep } from '../logic/movement/move-step';
import { rotateStep } from '../logic/movement/rotate-step';
import { renderGame } from '../logic/rendering/render-game';
import { renderMap } from '../logic/rendering/render-map';
import { updatePlaneFromControls } from '../logic/plane/update-plane-from-controls';
import { invalidateMapCache } from '../logic/rendering/render-map-background';
import { useRayCastingStore, RayCastingStore } from '../store/ray-casting-store';
import { useShallow } from 'zustand/react/shallow';

const selectRaycasterState = (state: RayCastingStore) => [
  state.resetKey,
  state.planeWidth,
  state.dirLength,
] as const;

interface RaycasterProps {
  gameCanvasRef: RefObject<HTMLCanvasElement | null>;
  mapCanvasRef: RefObject<HTMLCanvasElement | null>;
}

export function Raycaster({
  gameCanvasRef,
  mapCanvasRef,
}: RaycasterProps) {
  const [resetKey, planeWidth, dirLength] = useRayCastingStore(useShallow(selectRaycasterState));

  const state = useRef<RaycasterState>({
    pos: [...INITIAL_POS],
    dir: [...INITIAL_DIR],
    plane: [...INITIAL_PLANE],
    map: MAP,
    textures: TEXTURES,
  });

  useEffect(() => {
    state.current.pos = [...INITIAL_POS];
    state.current.dir = [...INITIAL_DIR];
    state.current.plane = [...INITIAL_PLANE];
    invalidateMapCache();
  }, [resetKey]);

  useEffect(() => {
    updatePlaneFromControls(state.current, planeWidth, dirLength);
  }, [
    planeWidth,
    dirLength,
  ]);

  useEffect(() => {
    let running = true;
    let moveAnimationId: number;
    let renderAnimationId: number;
    let lastMapRenderTime = 0;
    const MAP_RENDER_INTERVAL = 1000 / 30;

    function move() {
      if (!running) return;
      const { controlState } = useRayCastingStore.getState();
      const config = { moveSpeed: MOVE_SPEED, rotationSpeed: ROTATION_SPEED };
      if (controlState.forward) moveStep(1, state.current, config);
      if (controlState.back) moveStep(-1, state.current, config);
      if (controlState.left) rotateStep(1, state.current, config);
      if (controlState.right) rotateStep(-1, state.current, config);
      moveAnimationId = requestAnimationFrame(move);
    }

    function render() {
      if (!running) return;
      const gameCanvas = gameCanvasRef.current;
      if (!gameCanvas) return;
      const { fishEyeCorrection } = useRayCastingStore.getState();
      renderGame(gameCanvas, state.current, fishEyeCorrection);
    }

    function renderMapView(currentTime: number) {
      const mapCanvas = mapCanvasRef.current;
      const gameCanvas = gameCanvasRef.current;
      if (!mapCanvas || !gameCanvas) return;

      const { rayCount, showPerpDistances, controlState } = useRayCastingStore.getState();
      const shouldThrottle = rayCount > 64;

      if (!shouldThrottle || currentTime - lastMapRenderTime >= MAP_RENDER_INTERVAL) {
        renderMap(mapCanvas, gameCanvas, state.current, controlState, rayCount, showPerpDistances);
        lastMapRenderTime = currentTime;
      }
    }

    function loop(currentTime: number) {
      if (!running) return;
      render();
      renderMapView(currentTime);
      renderAnimationId = requestAnimationFrame(loop);
    }

    move();
    renderAnimationId = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (moveAnimationId) {
        cancelAnimationFrame(moveAnimationId);
      }
      if (renderAnimationId) {
        cancelAnimationFrame(renderAnimationId);
      }
    };
  }, [gameCanvasRef, mapCanvasRef, resetKey]);

  return null;
}
