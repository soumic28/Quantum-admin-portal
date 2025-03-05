import { useEffect, useState } from "react";
import { getPasses } from "../api/pass";
import { Pass } from "../interfaces";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";
/**
 * create , update , delete passes function add over here if needed
 */
export default function PassPage() {
  const [passes, setPasses] = useState<Pass[]>([]);

  const { toast } = useToast();
  useEffect(() => {
    async function fetchPasses() {
      try {
        const response = await getPasses();
        if(response.data === null) setPasses([]);
        else setPasses(response.data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
        });
      }
    }
    fetchPasses();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex my-6">
        <h1 className="text-3xl">Passes</h1>
      </div>
      <div className="flex flex-col">
        {passes.length == 0 && (
          <p className="w-full flex items-center text-5xl capitalize justify-center  h-[calc(100vh-10rem)]">
            No Passes Found{" "}
          </p>
        )}
        {passes.length === 0 && (
            <p className="w-full flex items-center text-5xl capitalize justify-center h-[calc(100vh-10rem)]">
                No Passes listed
            </p>
        )}
        {passes.length > 0 &&
          passes.map((pass, index) => {
            return (
              <div
                key={index}
                className="border rounded-lg p-2 mx-2 my-4 py-6 px-4 grid grid-cols-5"
              >
                <div className="col-span-4 ">
                  <h1 className="text-2xl mb-3 flex gap-3 items-center">
                    {pass.name}{" "}
                    <Badge variant="outline" className="capitalize">
                      {pass.type}
                    </Badge>{" "}
                  </h1>
                  <p>{pass.description}</p>
                </div>
                <div className="col-span-1">
                  <p>Price: {pass.price}</p>
                  <p>Amount: {pass.amount}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}