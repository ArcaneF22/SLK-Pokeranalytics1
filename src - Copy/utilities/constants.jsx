const Token = JSON.parse( localStorage.getItem('Token') );
export const Fetch = {
                        users:          import.meta.env.VITE_GET_USERS,
                        accounts:       import.meta.env.VITE_GET_ACCOUNTS,
                        applications:   import.meta.env.VITE_GET_APPS,
                        clubs:          import.meta.env.VITE_GET_CLUBS,
                        history:        import.meta.env.VITE_GET_HISTORY,
                        notification:        import.meta.env.VITE_GET_NOTIFICATION,
                        authenticate:        import.meta.env.VITE_GET_AUTHENTICATE
                    };

export const Path = {
                        icons:          import.meta.env.VITE_GET_USERS,
                        apps:       import.meta.env.VITE_GET_ACCOUNTS,
                        clubs:   import.meta.env.VITE_GET_APPS,
                        avatars:          import.meta.env.VITE_GET_CLUBS,
                        logo:        import.meta.env.VITE_GET_HISTORY,
                        pictures: ""
                    };
