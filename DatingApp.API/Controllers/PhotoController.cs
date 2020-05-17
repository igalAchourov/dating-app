using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _repo = repo;
            _mapper = mapper;

            Account acc = new Account(
            _cloudinaryConfig.Value.CloudName,
            _cloudinaryConfig.Value.ApiKey,
            _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        //naming the route for using CreatedAtRoute()
        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photo);
        }





        [HttpPost]
        //method for upload photos
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            //checks if the user is authorized 
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            //gets the user from repository
            var userFromRepo = await _repo.GetUser(userId);
            //create a variable that contains the image uploaded 
            var file = photoForCreationDto.File;
            //create new ImageUploadResult() from CloudinaryDotNet.Actions  
            var uploadResult = new ImageUploadResult();
            //checks if file contain data
            if (file.Length > 0)
            {
                //read the file data and initialize into stream 
                using (var stream = file.OpenReadStream())
                {
                    //create ImageUploadParams() from  CloudinaryDotNet.Actions to config our images
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    //this is where we upload the photo to cloudinary
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            //gets the url and the Id from cloudinary 
            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            //convert the photoForCreationDto to Photo object
            var photo = _mapper.Map<Photo>(photoForCreationDto);

            //checking if the user have photos 
            if (!userFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }
            //add the photo to the user 
            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                // convert photo type of Photo to PhotoForReturnDto
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                // Creates a Microsoft.AspNetCore.Mvc.CreatedAtRouteResult object that produces
                //a Microsoft.AspNetCore.Http.StatusCodes.Status201Created response.
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
            }
            return BadRequest("Could not add photo");
        }


        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            //checks if the user is authorized 
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var user = await _repo.GetUser(userId);
            //checks if the user have that photo
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _repo.GetPhoto(id);
            if (photoFromRepo.IsMain)
            {
                return BadRequest("This is already the main photo");
            }
            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;


            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Could not set photo to main");

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            //check if the user authorized
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var user = await _repo.GetUser(userId);
            //checks if the user have that photo
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }
            var photoFromRepo = await _repo.GetPhoto(id);
            if (photoFromRepo.IsMain)
            {
                return BadRequest("You cannot delete your main photo");
            }


            if (photoFromRepo.PublicId != null)
            {
                var deletionParams = new DeletionParams(photoFromRepo.PublicId);
                var result = _cloudinary.Destroy(deletionParams);

                if (result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                }
            }

            if (photoFromRepo.PublicId == null)
            {
                _repo.Delete(photoFromRepo);
            }

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete the photo");

        }

    }
}