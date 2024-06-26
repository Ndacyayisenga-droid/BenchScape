import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useEnvironmentById, useOSFamily } from "../../hooks";
import { createAppBarConfig } from "../../utils";
import { z } from "zod";
import { Select } from "../../components";
import { saveEnvironment } from "../../api";

const schema = z.object({
  infraName: z.string(),
  infraDescription: z.string(),
  osVersion: z.string(),
  osName: z.string(),
  systemArch: z.string(),
  cores: z.string(),
  memory: z.string(),
  jvmName: z.string(),
  java: z.string(),
  jmh: z.string(),
});

type EnvironmentFormData = z.infer<typeof schema>;

const inputClasses =
  "w-24 text-center text-sm border-0 border-b border-gray-200 focus:border-0 focus:border-b focus:border-gray-400";

const EnvironmentDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useEnvironmentById(id);
  const { data: osFamilyOptions } = useOSFamily();
  const { handleSubmit, register, control, reset } =
    useForm<EnvironmentFormData>({
      mode: "onChange",
      resolver: zodResolver(schema),
    });

  const navigate = useNavigate();

  const onSubmit = async (data: EnvironmentFormData) => {
    const {
      infraName,
      infraDescription,
      jvmName,
      memory,
      jmh,
      java,
      cores,
      systemArch,
      osName,
      osVersion,
    } = data;

    const payload = {
      id,
      osName,
      osVersion: osVersion,
      name: infraName,
      description: infraDescription,
      systemMemory: Number(memory),
      jmhVersion: jmh,
      jvmName: jvmName,
      jvmVersion: java,
      systemArch: systemArch,
      systemProcessors: Number(cores),
    };
    await saveEnvironment(payload).then(() => navigate("/environments"));
  };

  useEffect(() => {
    createAppBarConfig({
      title: "Environment details",
      actions: [],
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      reset({
        infraName: data?.name || "",
        infraDescription: data?.description || "",
        osName: data?.osName || "",
        osVersion: data?.osVersion || "",
        cores: data?.systemProcessors ? String(data?.systemProcessors) : "",
        memory: data?.systemMemory ? String(data?.systemMemory) : "",
        java: data?.jvmVersion || "",
        jmh: data?.jmhVersion || "",
        jvmName: data?.jvmName || "",
        systemArch: data?.systemArch || "",
      });
    }
  }, [
    data?.description,
    data?.jmhVersion,
    data?.jvmVersion,
    data?.name,
    data?.osName,
    data?.osVersion,
    data?.systemMemory,
    data?.systemProcessors,
    data?.systemArch,
    data?.jvmName,
    isLoading,
    reset,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3 ml-2">
          <div className="flex flex-col gap-1" style={{ maxWidth: "400px" }}>
            <label className="text-xs text-gray-800">Infrastructure name</label>
            <input
              className="border-2 border-slate-300 rounded"
              type="text"
              {...register("infraName")}
            />
          </div>
          <div className="flex flex-col gap-1 max-w-screen-sm">
            <label className="text-xs text-gray-800">
              Infrastructure description
            </label>
            <textarea
              className="border-2 border-slate-300 rounded"
              {...register("infraDescription")}
            />
          </div>
        </div>
        <div style={{ maxWidth: "400px" }} className="ml-2">
          <p className="font-bold">Infrastructure</p>
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-800">Operating System</div>
              <div className="text-sm text-gray-800">
                <Controller
                  name="osName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={osFamilyOptions?.filter(
                        (option) => option !== "UNKNOWN"
                      )}
                      value={field.value !== "UNKNOWN" ? field.value : null}
                      valueExtractor={(name) => name}
                      labelExtractor={(label) => {
                        if (label === "MAC_OS") {
                          return "Mac OS";
                        } else {
                          return (
                            label.charAt(0).toUpperCase() +
                            label.slice(1).toLowerCase()
                          );
                        }
                      }}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-800">Os Version</div>
              <div className="text-sm text-gray-800">
                <input
                  type="text"
                  {...register("osVersion")}
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-800">CPU cores</div>
              <div className="text-sm text-gray-800">
                <input
                  type="text"
                  {...register("cores")}
                  className={inputClasses}
                  pattern="[0-9]*"
                  title="Please CPU cores should be a valid number"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-800">Memory</div>
              <div className="text-sm text-gray-800 flex items-center">
                {data?.systemMemoryReadable}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-800">Java</div>
              <div className="text-sm text-gray-800 flex items-center">
                {data?.jvmName} {data?.jvmVersion}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-800">JMH</div>
              <div className="text-sm text-gray-800 flex items-center">
                {data?.jmhVersion}
              </div>
            </div>
          </div>
        </div>
        <div className="flex self-end gap-2">
          <button
            className="border-2 text-sm rounded-md text-gray-800"
            style={{
              padding: "6px 18px",
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border-2 text-sm rounded-md bg-indigo-700 border-indigo-700 text-white"
            style={{
              padding: "6px 30px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default EnvironmentDetails;
