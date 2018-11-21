﻿using PtcApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ptcApi.Model
{
    public class SecurityManager
    {
        public AppUserAuth ValidateUser(AppUser user)
        {
            AppUserAuth ret = new AppUserAuth();
            AppUser authUser = null;

            using (var db = new PtcDbContext())
            {
                // Attempt to validate user
                authUser = db.Users.Where(
                  u => u.UserName.ToLower() == user.UserName.ToLower()
                  && u.Password == user.Password).FirstOrDefault();
            }

            if (authUser != null)
            {
                // Build User Security Object
                ret = BuildUserAuthObject(authUser);
            }

            return ret;
        }

        protected List<AppUserClaim> GetUserClaims(AppUser authUser)
        {
            List<AppUserClaim> list = new List<AppUserClaim>();

            try
            {
                using (var db = new PtcDbContext())
                {
                    list = db.Claims.Where(
                             u => u.UserId == authUser.UserId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "Exception trying to retrieve user claims.", ex);
            }

            return list;
        }

        protected AppUserAuth BuildUserAuthObject(AppUser authUser)
        {
            AppUserAuth ret = new AppUserAuth();
            List<AppUserClaim> claims = new List<AppUserClaim>();

            // Set User Properties
            ret.UserName = authUser.UserName;
            ret.IsAuthenticated = true;
            ret.BearerToken = new Guid().ToString();

            // Get all claims for this user
            claims = GetUserClaims(authUser);

            // Loop through all claims and 
            // set properties of user object
            foreach (AppUserClaim claim in claims)
            {
                try
                {
                    // TODO: Check data type of ClaimValue
                    typeof(AppUserAuth).GetProperty(claim.ClaimType)
                      .SetValue(ret, Convert.ToBoolean(claim.ClaimValue), null);
                }
                catch
                {
                }
            }
            return ret;
        }
    }
}
