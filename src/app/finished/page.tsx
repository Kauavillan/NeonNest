import Link from "next/link";
import Button from "../items/Button";

export default function Finished() {
  return (
    <div>
      <h1>Perfect! Your purchase is already being processed.</h1>
      <p>
        We will notify you in about 200 years about the paying method, but you
        can be sure that your orders will arrive at the expected time.
      </p>
      <p>
        Use the waiting time to keep buying! Continue shopping and be even more
        ready to the future.
      </p>
      <Link href={"/#products"}>Back to home</Link>
    </div>
  );
}
