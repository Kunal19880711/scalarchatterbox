const { task, desc } = require("jake");
const { spawn } = require("child_process");

async function asyncRun(cmd, print = true) {
  return new Promise((resolve, reject) => {
    const [program, ...args] = cmd.split(" ").filter((token) => !!token);
    const subprocess = spawn(program, args);

    subprocess.stdout.on("data", (data) => console.log(data.toString()));
    subprocess.stderr.on("data", (data) => console.error(data.toString()));
    subprocess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

const dockerImgName = "scalarchatterbox-node";
const containerName = "angry";

desc(`Building docker image: [${dockerImgName}]`);
task("build-docker", async function () {
  try {
    await asyncRun(`docker build -t ${dockerImgName} .`);
  } catch (error) {
    console.error(`Error building docker image: ${error}`);
    throw error;
  }
});

desc(`cleaning up docker container: [${containerName}]`);
task("cleanup", async function () {
  await asyncRun(`docker rm -f ${containerName}`);
});

desc(
  `(re)starting docker container: [${containerName}] using docker image: [${dockerImgName}]`
);
task("run-docker", ["cleanup"], async function () {
  try {
    await asyncRun(
      `docker run -d --name ${containerName} -p 8000:8000 ${dockerImgName}`
    );
  } catch (error) {
    console.error(`Error building docker image: ${error}`);
    throw error;
  }
});
