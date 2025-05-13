
'use client';

import { createContext, useContext } from 'react';

export const DestinationContext = createContext<any>(null);

export const useDestination = () => useContext(DestinationContext);
