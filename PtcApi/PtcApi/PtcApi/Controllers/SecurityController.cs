using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PtcApi.Model;
using PtcApi.Security;

namespace PtcApi.Controllers
{
    [Route("api/[controller]")]
    public class SecurityController : Controller
    {
        private JwtSettings _jwtSettings;

        public SecurityController(JwtSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
        }

        [HttpPost("login")]
        //[Authorize]
        public IActionResult Login([FromBody] AppUser user)
        {
            AppUserAuth auth = new AppUserAuth();
            SecurityManager mgr = new SecurityManager(_jwtSettings);

            auth = mgr.ValidateUser(user);
            IActionResult ret;
            if (auth.IsAuthenticated)
            {
                ret = StatusCode(StatusCodes.Status200OK, auth);
            }
            else
            {
                ret = StatusCode(StatusCodes.Status404NotFound,
                                 "Invalid User Name/Password.");
            }

            return ret;
        }
    }
}
