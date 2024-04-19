export const Fetch = {
                        users:              import.meta.env.VITE_GET_USERS,
                        accounts:           import.meta.env.VITE_GET_ACCOUNTS,
                        applications:       import.meta.env.VITE_GET_APPS,
                        clubs:              import.meta.env.VITE_GET_CLUBS,
                        history:            import.meta.env.VITE_GET_HISTORY,
                        notification:       import.meta.env.VITE_GET_NOTIFICATION,
                        notification_count: import.meta.env.VITE_GET_NOTIFICATION_COUNT,
                        authenticate:       import.meta.env.VITE_GET_AUTHENTICATE,
                        profile:            import.meta.env.VITE_GET_PROFILE,
                        images:             import.meta.env.VITE_GET_IMAGES
                    };

export const DD = {
                        applications:     import.meta.env.VITE_DROP_APPS,
                        applications2:     import.meta.env.VITE_DROP_APPS2,
                    };

export const Upsert = {
                        users:              import.meta.env.VITE_UPSERT_USERS,
                        accounts:           import.meta.env.VITE_UPSERT_ACCOUNTS,
                        applications:       import.meta.env.VITE_UPSERT_APPS,
                        clubs:              import.meta.env.VITE_UPSERT_CLUBS
                    };

export const Path = {
                        icons:              "/images/icons/",
                        apps:               "/images/apps/",
                        clubs:              "/images/clubs/",
                        avatars:            "/images/avatars/",
                        logo:               "/images/logo/",
                        pictures:           "/images/pictures/"
                    };
