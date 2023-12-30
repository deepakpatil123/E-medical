import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";
import PageviewIcon from '@mui/icons-material/Pageview';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { uniqueId } from "lodash";
import SummarizeIcon from '@mui/icons-material/Summarize';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import ApprovalIcon from '@mui/icons-material/Approval';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';



const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: "Home",
  // },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  // {
  //   id: uniqueId(),
  //   title: "Diary Entry",
  //   icon: EditNoteIcon,
  //   href: "/DiaryEntry",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Data Entry",
  //   icon: EditNoteIcon,
  //   href: "/DataEntry",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Reimbursement",
  //   icon: AccountBalanceIcon,
  //   href: "/Reimbursement",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Assistant Diary",
  //   icon: EditNoteIcon,
  //   href: "/AssistantDiary",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Bill Approval",
  //   icon: ApprovalIcon,
  //   href: "/BillApproval",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Approved Files",
  //   icon: ThumbUpOffAltIcon,
  //   href: "/Approved",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Returned Files",
  //   icon: ThumbDownOffAltIcon,
  //   href: "/Returned",
  // },
];

export default Menuitems;
