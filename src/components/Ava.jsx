import './Ava.css'

export default function Ava() {
  return (
    <div class="ava">
      <div class="ava__content">
        <div class="ava__ring" />
        <button type="button" class="ava__picture">
          <img
            src="https://images.unsplash.com/photo-1667563948694-a7147b3fe69e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=128&h=128&q=80"
            alt="Avatar"
            class="ava__media"
          />
        </button>
      </div>
    </div>
  )
}
