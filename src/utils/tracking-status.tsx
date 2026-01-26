import {
  AlertTriangleIcon,
  ConciergeBellIcon,
  MailQuestionIcon,
  MailWarningIcon,
  PackageCheckIcon,
  ReceiptTextIcon,
  ScanBarcodeIcon,
  TruckIcon,
  Undo2Icon,
} from 'lucide-react'

export type TrackingStatus =
  | 'labelCreated'
  | 'pickedUp'
  | 'inTransit'
  | 'attemptedDelivery'
  | 'awaitingDeliveryPickup'
  | 'delivered'
  | 'exception'
  | 'returned'
  | 'unknown'

export function getStatusIcon(status: TrackingStatus, className?: string) {
  switch (status) {
    case 'labelCreated':
      return <ReceiptTextIcon className={className ?? 'size-4'} />
    case 'pickedUp':
      return <ScanBarcodeIcon className={className ?? 'size-4'} />
    case 'inTransit':
      return <TruckIcon className={className ?? 'size-4'} />
    case 'attemptedDelivery':
      return <AlertTriangleIcon className={className ?? 'size-4'} />
    case 'awaitingDeliveryPickup':
      return <ConciergeBellIcon className={className ?? 'size-4'} />
    case 'delivered':
      return <PackageCheckIcon className={className ?? 'size-4'} />
    case 'exception':
      return <MailWarningIcon className={className ?? 'size-4'} />
    case 'returned':
      return <Undo2Icon className={className ?? 'size-4'} />
    case 'unknown':
      return <MailQuestionIcon className={className ?? 'size-4'} />
  }
}

export function getStatusColor(status: TrackingStatus) {
  switch (status) {
    case 'labelCreated':
      return 'bg-neutral-500 dark:bg-neutral-400'
    case 'pickedUp':
      return 'bg-sky-600 dark:bg-sky-400'
    case 'inTransit':
      return 'bg-blue-600 dark:bg-blue-400'
    case 'attemptedDelivery':
      return 'bg-orange-600 dark:bg-orange-400'
    case 'awaitingDeliveryPickup':
      return 'bg-emerald-600 dark:bg-emerald-400'
    case 'delivered':
      return 'bg-emerald-600 dark:bg-emerald-400'
    case 'exception':
      return 'bg-red-600 dark:bg-red-400'
    case 'returned':
      return 'bg-indigo-600 dark:bg-indigo-400'
    case 'unknown':
      return 'bg-neutral-500'
  }
}

export function getStatusBackgroundColor(status: TrackingStatus) {
  switch (status) {
    case 'labelCreated':
      return 'bg-neutral-500/10 dark:bg-neutral-400/10 hover:bg-neutral-500/10 dark:hover:bg-neutral-400/10'
    case 'pickedUp':
      return 'bg-sky-600/10 dark:bg-sky-400/10 hover:bg-sky-600/10 dark:hover:bg-sky-400/10'
    case 'inTransit':
      return 'bg-blue-600/10 dark:bg-blue-400/10 hover:bg-blue-600/10 dark:hover:bg-blue-400/10'
    case 'attemptedDelivery':
      return 'bg-orange-600/10 dark:bg-orange-400/10 hover:bg-orange-600/10 dark:hover:bg-orange-400/10'
    case 'awaitingDeliveryPickup':
      return 'bg-emerald-600/10 dark:bg-emerald-400/10 hover:bg-emerald-600/10 dark:hover:bg-emerald-400/10'
    case 'delivered':
      return 'bg-emerald-600/10 dark:bg-emerald-400/10 hover:bg-emerald-600/10 dark:hover:bg-emerald-400/10'
    case 'exception':
      return 'bg-red-600/10 dark:bg-red-400/10 hover:bg-red-600/10 dark:hover:bg-red-400/10'
    case 'returned':
      return 'bg-indigo-600/10 dark:bg-indigo-400/10 hover:bg-indigo-600/10 dark:hover:bg-indigo-400/10'
    case 'unknown':
      return 'bg-neutral-500/10 dark:bg-neutral-400/10 hover:bg-neutral-500/10 dark:hover:bg-neutral-400/10'
  }
}

export function getStatusTextColor(status: TrackingStatus) {
  switch (status) {
    case 'labelCreated':
      return 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
    case 'pickedUp':
      return 'text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300'
    case 'inTransit':
      return 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
    case 'attemptedDelivery':
      return 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300'
    case 'awaitingDeliveryPickup':
      return 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300'
    case 'delivered':
      return 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300'
    case 'exception':
      return 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
    case 'returned':
      return 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300'
    case 'unknown':
      return 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
  }
}
