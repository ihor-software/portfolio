namespace HitToMeet.API.Routes
{
    public class DefaultRoutes
    {
        public const string Root = "api";

        public const string Version = "v0";

        public const string Base = Root + "/" + Version;

        public static class Identity
        {
            public const string Login = Base + "/identity/login";

            public const string Register = Base + "/identity/register";

            public const string Logout = Base + "/identity/logout";

            public const string RefreshToken = Base + "/identity/refreshToken";
        }

        public static class Quiz
        {
            public const string QuizPath = Base + "/quiz";
        }

        public static class Casino
        {
            public const string GetAvailableSkins = Base + "/availableSkins";
        }
    }
}
