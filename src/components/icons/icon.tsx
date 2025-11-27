import {
  type LucideIcon,
  Search,
  ShoppingCart,
  User,
  Heart,
  Home,
  Settings,
  Menu,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Check,
  X,
  Trash,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Star,
  Bell,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  // Navigation
  home: Home,
  menu: Menu,
  close: X,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,

  // Actions
  search: Search,
  filter: Filter,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash,
  check: Check,
  eye: Eye,
  eyeOff: EyeOff,

  // E-commerce
  shoppingCart: ShoppingCart,
  package: Package,
  creditCard: CreditCard,
  star: Star,
  heart: Heart,

  // User
  user: User,
  bell: Bell,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  settings: Settings,

  // Status
  checkCircle: CheckCircle,
  alertCircle: AlertCircle,
  info: Info,
  spinner: Loader2,
} as const;

