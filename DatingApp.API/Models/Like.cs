namespace DatingApp.API.Models
{
    public class Like
    {
        //who send the like Id
        public int LikerId { get; set; }
        //who receive the like Id
        public int LikeeId { get; set; }
        //the user who send the like
        public User Liker { get; set; }
        //the user who receive the like
        public User Likee { get; set; }
    }
}