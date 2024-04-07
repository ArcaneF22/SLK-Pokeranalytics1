const Token = JSON.parse( localStorage.getItem('Token') );
export const Auth = {
                        A: Token['id'],
                        B: Token['token'],
                        C: Token['gadget']
                    };