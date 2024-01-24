namespace HitToMeet.Core.Enums
{
    public static class ErrorCodesEnums
    {
        public enum Global
        {
            Unknown = 5200,
            ModelError = 4000
        }

        public enum Registration
        {
            EmailOccupied = 4001,
            UsernameOccupied = 4002,
        }

        public enum Login
        {
            InvalidPassword = 4003,
            UserUnknown = 4004
        }

        public enum Token
        {
            RefreshingError = 4005,
            IsNotExpired = 4006,
            InvalidRefreshToken = 4007,
            ExpiredRefreshToken = 4008,
            InvalidatedRefreshToken = 4009,
            UsedRefreshToken = 4010,
            NotFoundRefreshToken = 4011,
            WrongJtiRefreshToken = 4012
        }

        public enum Quiz
        {
            ExceedAnimal = 4101
        }
    }
}
