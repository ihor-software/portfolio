using System;

namespace HitToMeet.Core.Options
{
    public class JwtOptions
    {
        public static string Secret { get; set; }

        public static TimeSpan TokenLifeTime { get; set; }
    }
}
