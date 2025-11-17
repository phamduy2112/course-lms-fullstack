
export const PATHS={
    AUTH:{
        LOGIN:'/login',
        REGISTER:'/register',
        FORGETPASSWORD:'/forget-password',

    },
    ADMIN:{
        COURSE:{
         CREATE:'create',
         EDIT:'edit',
         DELETE:'delete'   
        }
    }
    
} as const;

export type PathKey = keyof typeof PATHS;