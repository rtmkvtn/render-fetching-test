import type { User } from '@/mocks/data/generators'

export function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-12 w-12 rounded-full"
      />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </div>
    </div>
  )
}
