import { atom } from 'jotai';

export const searchModalAtom = atom<boolean>(false);

export const searchQueryAtom = atom<string>('');

export const loginModalAtom = atom<boolean>(false);

export const ownersManualModalAtom = atom<boolean>(false);
