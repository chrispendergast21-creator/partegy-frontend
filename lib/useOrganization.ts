'use client';

import { useState } from 'react';

export const useOrganization = () => {
  const [currentOrg] = useState({
    id: 1,
    name: 'Demo Corporation'
  });

  return {
    currentOrg
  };
};
