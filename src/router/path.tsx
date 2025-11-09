
export const PATHS={
    AUTH:{
        LOGIN:'/login',
        
    },
    
} as const;

export type PathKey = keyof typeof PATHS;