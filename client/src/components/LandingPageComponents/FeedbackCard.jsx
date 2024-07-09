// import { avatar, quotationMark } from "../assets";
import avatar from "../../assets/avatar.png";
import quotationMark from "../../assets/quotationMark.png";
const FeedbackCard = () => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl my-8 mx-2">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img src={avatar} />
          <div>
            <h1>Jenny Wilson</h1>
            <p>Nashik, Mh</p>
          </div>
        </div>
        <img className="h-8" src={quotationMark} />
      </div>

      <div className="py-8">
        <h3 className="text-lg">
          Thrilled with my sugarcane crop! This variety from [Name] exceeded my
          expectations. The stalks grew thick and juicy, perfect for extracting
          high-quality juice. The yield was impressive, and the plants showed
          excellent resistance to pests and diseases. Overall, I am extremely
          satisfied and will definitely be planting this variety again next
          season.
        </h3>
      </div>
    </div>
  );
};

export default FeedbackCard;
