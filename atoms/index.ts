import { atom } from 'jotai';

export const searchAtom = atom<boolean>(false);

export const queryAtom = atom<string>('');

export const loginModalAtom = atom<boolean>(false);

export const ownersManualModalAtom = atom<boolean>(false);

export const mobileMenuAtom = atom<boolean>(false);

export const mobileSearchAtom = atom<boolean>(false);
