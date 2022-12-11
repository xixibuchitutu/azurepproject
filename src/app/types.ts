export interface User {
    _id: string;
    username: string;
    email: string;
}


export interface Login {
    name: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
    password_confirm: string;
    name: string;
}

export interface Review {
    _id:string;
    userId?: string;
    date: string;
    description: string;
    fooId: string;
    username: string;
}

export interface Food {
    _id: string;
    name: string;
    image_url: string;
    description: string;
    cuisine: string;
    course: string;
    diet: string;
    prep_time: string;
    instructions: string;
}
