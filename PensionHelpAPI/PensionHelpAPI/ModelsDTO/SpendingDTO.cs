using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PensionHelpAPI.ModelsDTO
{
    public class SpendingDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Rating { get; set; }
    }
}
