const Token = JSON.parse( localStorage.getItem('Token') );

export const Auth = {
                        A: Token['id'],
                        B: Token['token'],
                        C: Token['gadget']
                    };
export const Fetch = {
                        users: import.meta.env.VITE_GET_USERS,
                        apps: import.meta.env.VITE_GET_APPS,
                        clubs: import.meta.env.VITE_GET_CLUBS
                    };
