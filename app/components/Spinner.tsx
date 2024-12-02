export function Spinner() {
  return (
    <div className='flex h-[40px] w-[40px] animate-spin items-center justify-center rounded-[20px] bg-neutral-950 bg-gradient-to-r from-white dark:bg-slate-100 dark:from-black'>
      <div className='h-[30px] w-[30px] rounded-[15px] bg-white dark:bg-neutral-900' />
    </div>
  )
}
