import ManipulatingDom from '../components/ManipulatingDom';
import StopWatch from '../components/StopWatch';

function RefHook() {
  return (
    <div>
      <h2 class="text-3xl font-extrabold dark:text-white">StopWatch</h2>
      <br />
      <StopWatch />

      <br /><br />
      <h2 class="text-3xl font-extrabold dark:text-white">Manipulating DOM</h2>
      <br />
      <ManipulatingDom />
    </div>
  )
}

export default RefHook