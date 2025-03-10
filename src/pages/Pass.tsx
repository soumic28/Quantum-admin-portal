/**
 * create , update , delete passes function add over here if needed
 */
export default function PassPage() {
  const passes = [
    {
      name: "Quantum LITE",
      type: "subscription",
      description: "Subscription pass for basic access",
      price: "₹5000",
      amount: "₹6000"
    },
    {
      name: "Quantum MAX",
      type: "subscription",
      description: "Subscription pass for premium access",
      price: "₹10000",
      amount: "₹13000"
    }
  ];

  return (
    <div className="flex flex-col">
      <div className="flex my-6">
        <h1 className="text-3xl">Passes</h1>
      </div>
      <div className="flex flex-col">
        
        {passes.map((pass, index) => (
          <div key={index} className="border rounded-lg p-2 mx-2 my-4 py-6 px-4 grid grid-cols-5">
            <div className="col-span-4">
              <h1 className="text-2xl mb-3 flex gap-3 items-center">
                {pass.name} 
                <span className="text-xs border rounded px-2 py-1 capitalize">{pass.type}</span>
              </h1>
              <p>{pass.description}</p>
            </div>
            <div className="col-span-1 space-y-2">
              <p>Price: {pass.price}</p>
              <p>Amount: {pass.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
