using GuideWave.Data;
using GuideWave.Models;
using GuideWave.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace GuideWave.Repository
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository

    {
        private readonly ApplicationDbContext _dbContext;

        public ReviewRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task Update(Review enitiy)
        {
            _dbContext.Reviews.Update(enitiy);

            await _dbContext.SaveChangesAsync();
        }
        public async Task<IEnumerable<Review>> GetByGuideId(int guideId)
        {
            return await _dbContext.Reviews
                .Where(r => r.GuideId == guideId)
                .ToListAsync();
        }

    }
}
