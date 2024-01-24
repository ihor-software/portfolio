using AutoMapper;
using HitToMeet.DAL.Entities;
using HitToMeet.DAL.Entities.Quiz;
using HitToMeet.DAL.Interfaces;
using HitToMeet.DAL.Managers;
using HitToMeet.BL.Interfaces;
using HitToMeet.BL.Models.Quiz;
using HitToMeet.BL.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HitToMeet.BL.Services
{
    public class QuizService : IQuizService
    {
        private readonly UserManager userManager;
        private readonly IRepository repository;
        private readonly IMapper mapper;

        public QuizService(IRepository repository, UserManager userManager, IMapper mapper)
        {
            this.repository = repository;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        public async Task<bool> HasAnimal(string userId)
        {
            User user = await this.userManager.FindByIdAsync(userId);
            return user.AnimalId != null;
        }

        public async Task ClearAnimal(string userId)
        {
            User user = await this.userManager.FindByIdAsync(userId);
            user.AnimalId = null;
            await userManager.UpdateAsync(user);
        }

        public async Task AddAnimalToUser(string userId, int animalId)
        {
            User user = await this.userManager.FindByIdAsync(userId);
            user.AnimalId = animalId;
            await userManager.UpdateAsync(user);
        }

        public async Task<QuizResult> GetQuiz()
        {
            IEnumerable<Question> questions = await this.repository.GetRangeAsync<Question>(false, q => true, q => q.Answers);
            IEnumerable<QuestionModel> qModels = questions.Select(q => this.mapper.Map<QuestionModel>(q));
            return new QuizResult { Questions = qModels };          
        }
    }
}
