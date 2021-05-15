using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PensionHelpAPI.ViewModels
{
    public class SavingAddMoney
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int MaxGoal { get; set; }
        public int CurrentGoal { get; set; }
        public int AddMoney { get; set; }
    }
}
