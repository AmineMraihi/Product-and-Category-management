using System.Collections.Generic;

namespace PtcApi.Model
{
    public class AppUserAuth
    {
        public AppUserAuth()
        {
            UserName = "Not authorised";
            BearerToken = string.Empty;
        }
        public string UserName { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthenticated { get; set; }
        public bool CanAccessProducts { get; set; }
        public IList<AppUserClaim> Claims { get; set; }
    }
}
