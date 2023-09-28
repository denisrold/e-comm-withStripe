export default function Home() {
  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl">Mobiles</h2>
        <div className="py-4">
          <div className="w-64">
            <div className="bg-blue-100 rounded-xl p-5">
              <img src="/products/iphone.png"></img>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">Iphone 14 Pro</h3>
            </div>
            <p className="text-sm mt-1 leading-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget sapien nec ex vehicula pharetra. Sed vitae erat eget lectus
              tincidunt facilisis. Sed bibendum tellus at justo rhoncus, ac
              vehicula neque hendrerit.
            </p>
            <div className="flex mt-1">
              <div className="text-2xl font-bold grow">$899</div>
              <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
