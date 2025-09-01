using GuideWave.Data;
using GuideWave.Models;
using GuideWave.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace GuideWave.Repository
{
    public class PlaceRepository : GenericRepository<Place>,IPlaceRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public PlaceRepository(ApplicationDbContext dbContext):base(dbContext)
        {
            _dbContext = dbContext;
            
        }

        public async Task Update(Place enitiy)
        {
            await _dbContext.SaveChangesAsync();

        }
        public async Task<IEnumerable<Place>> GetPlacesByGuide(int guideId)
        {
            return await _dbContext.Places
                .Where(p => p.GuideId == guideId)
                .ToListAsync();
        }

    }
}
