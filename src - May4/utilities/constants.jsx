export const TimeZoned = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const Fetch = {
                        users:              import.meta.env.VITE_GET_USERS,
                        myaccounts:         import.meta.env.VITE_GET_MYACCOUNTS,
                        accounts:           import.meta.env.VITE_GET_ACCOUNTS,
                        accountsupline:     import.meta.env.VITE_GET_ACCOUNTS_UPLINE,
                        applications:       import.meta.env.VITE_GET_APPS,
                        myclubs:            import.meta.env.VITE_GET_MYCLUBS,
                        clubs:              import.meta.env.VITE_GET_CLUBS,
                        history:            import.meta.env.VITE_GET_HISTORY,
                        myhistory:          import.meta.env.VITE_GET_MYHISTORY,
                        notification:       import.meta.env.VITE_GET_NOTIFICATION,
                        notification_count: import.meta.env.VITE_GET_NOTIFICATION_COUNT,
                        authenticate:       import.meta.env.VITE_GET_AUTHENTICATE,
                        profile:            import.meta.env.VITE_GET_PROFILE,
                        images:             import.meta.env.VITE_GET_IMAGES,
                        unions:             import.meta.env.VITE_GET_UNIONS,
                        company:            import.meta.env.VITE_GET_COMPANY,
                        roles:              import.meta.env.VITE_GET_ROLES,
                        uplines:            import.meta.env.VITE_GET_UPLINES,
                        uplines2:           import.meta.env.VITE_GET_UPLINES2,
                        exchangerates:       import.meta.env.VITE_GET_EXCHANGERATE,
                    };

                    
export const URL = {
                        fxusd1:             import.meta.env.VITE_URL_FXUSD1,
                        fxusd2:             import.meta.env.VITE_URL_FXUSD2,
                        fxusd3:             import.meta.env.VITE_URL_FXUSD3,
                    };

export const API = {
                        fxusd1API:          import.meta.env.VITE_API_FXUSD1,
                    };

export const Upsert = {
                        users:              import.meta.env.VITE_UPSERT_USERS,
                        accounts:           import.meta.env.VITE_UPSERT_ACCOUNTS,
                        applications:       import.meta.env.VITE_UPSERT_APPS,
                        clubs:              import.meta.env.VITE_UPSERT_CLUBS,
                        unions:             import.meta.env.VITE_UPSERT_UNIONS,
                        uplines:            import.meta.env.VITE_UPSERT_UPLINES,
                        profile:            import.meta.env.VITE_UPSERT_PROFILE,
                        exchangerate:       import.meta.env.VITE_UPSERT_EXCHANGERATE,
                    };

export const Path = {
                        icons:              "/images/icons/",
                        apps:               "/images/apps/",
                        clubs:              "/images/clubs/",
                        avatars:            "/images/avatars/",
                        logo:               "/images/logo/",
                        pictures:           "/images/pictures/"
                    };

export const unionType = [
                        {
                          key: 'PRIVATE',
                          text: 'PRIVATE',
                          value: 'PRIVATE',
                        },
                        {
                          key: 'PUBLIC',
                          text: 'PUBLIC',
                          value: 'PUBLIC',
                        },
                        {
                          key: 'UNION',
                          text: 'UNION',
                          value: 'UNION',
                        },
                      ]

export const LoadingData = () => {
    return (
            <>
              <div className="ui segment basic">
                <div className="ui active inverted dimmer">
                  <div className="ui indeterminate text loader">Loading data...</div>
                </div>
                <br /> <br /><br /><br /><br /><br /><br />
              </div>
            </>
    )
}
export const getDateTime = (i) => {
  const d = new Date(i);
  const o = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const w = d.toLocaleDateString('en-US', o);
  return w;
}

export const formSettings = (i) => {
  
  return w;
}

export const Token = (i) => {
    const Token = JSON.parse( localStorage.getItem('Token') );
    const id          = Token['id']
    const token       = Token['token']
    const gadget      = Token['gadget']
    const timezone    = TimeZoned
    const Auth = {
      A:      Token['id'],
      B:      Token['token'],
      C:      Token['gadget'],
      D:      Set.TimeZoned,
    };
  return {Auth,id,token,gadget,timezone};
}


