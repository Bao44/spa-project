export interface BookingData {
  id: string
  service: string
  serviceName: string
  date: Date
  time: string
  customer: {
    name: string
    phone: string
    email: string
    notes: string
  }
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: Date
}

// Simulate API call to create booking
export async function createBooking(
  bookingData: Omit<BookingData, "id" | "status" | "createdAt">,
): Promise<BookingData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const booking: BookingData = {
    ...bookingData,
    id: `booking-${Date.now()}`,
    status: "pending",
    createdAt: new Date(),
  }

  // Store in localStorage for demo purposes
  const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
  existingBookings.push(booking)
  localStorage.setItem("bookings", JSON.stringify(existingBookings))

  // Trigger notification to admin
  const event = new CustomEvent("newBooking", { detail: booking })
  window.dispatchEvent(event)

  return booking
}

// Get all bookings
export function getAllBookings(): BookingData[] {
  return JSON.parse(localStorage.getItem("bookings") || "[]")
}

// Update booking status
export function updateBookingStatus(bookingId: string, status: BookingData["status"]): void {
  const bookings = getAllBookings()
  const updatedBookings = bookings.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking))
  localStorage.setItem("bookings", JSON.stringify(updatedBookings))

  // Trigger status update event
  const event = new CustomEvent("bookingStatusUpdated", {
    detail: { bookingId, status },
  })
  window.dispatchEvent(event)
}
