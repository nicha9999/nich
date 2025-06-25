export interface User
{
    userId?: number;
    fullname?: string;
    username?: string;
    password?: string;
    pic?: string;
    positionId?: number;
    email?: string;
    isAdmin?: string;
    lastLogin?: string;
    active?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Positions
{
    positionId?: number;
    positionName?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface UserPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}