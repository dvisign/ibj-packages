import { fileURLToPath } from 'url';
import path from 'path';

export function getCommonPaths(importMetaUrl) {
  const filename = fileURLToPath(importMetaUrl);
  const dirname = path.dirname(filename);

  // 파일 또는 서브 디렉토리의 상대 경로를 받아 전체 경로를 반환하는 함수
  const resolvePath = (...segments) => path.resolve(dirname, ...segments);

  // 파일 또는 서브 디렉토리의 상대 경로를 받아 조인한 전체 경로를 반환하는 함수
  const joinPath = (...segments) => path.join(dirname, ...segments);

  return { filename, dirname, resolvePath, joinPath };
}
