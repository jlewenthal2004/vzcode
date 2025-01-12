import { useState, useCallback } from 'react';

// TODO bring this feature back
// When a page is opened with an active file,
// make sure all the directories leading to that file
// are opened automatically.
//export const initialOpenDirectories = (activeFile) => {
//  const openDirectories = {};
//  if (activeFile) {
//    const path = activeFile.split('/');
//    for (let i = 1; i < path.length; i++) {
//      openDirectories[path.slice(0, i).join('/')] = true;
//    }
//  }
//  return openDirectories;
//};

// Inspired by
// https://github.com/vizhub-core/vizhub/blob/main/vizhub-v2/packages/neoFrontend/src/pages/VizPage/Body/Editor/FilesSection/useOpenDirectories.js
// TODO move this into reducer
export const useOpenDirectories = () => {
  // The set of open directories by path/
  const [openDirectories, setOpenDirectories] = useState<
    Set<string>
  >(new Set());

  // Whether a directory is open.
  const isDirectoryOpen: (path: string) => boolean =
    useCallback(
      (path) => openDirectories.has(path),
      [openDirectories],
    );

  /**
   * Toggles the state of a directory (open/close).
   * If the directory is currently open, it will close it.
   * If it's closed, it will open it.
   */
  const toggleDirectory = useCallback(
    (directoryPath: string) => {
      // Create a copy of the currently open directories
      const updatedOpenDirectories = new Set(
        openDirectories,
      );

      // Check if the directory is currently open
      const directoryIsOpen =
        isDirectoryOpen(directoryPath);

      // Toggle the directory's state
      if (directoryIsOpen) {
        updatedOpenDirectories.delete(directoryPath);
      } else {
        updatedOpenDirectories.add(directoryPath);
      }

      // Update the state with the modified set of open directories
      setOpenDirectories(updatedOpenDirectories);
    },
    [openDirectories, isDirectoryOpen],
  );

  return { isDirectoryOpen, toggleDirectory };
};
