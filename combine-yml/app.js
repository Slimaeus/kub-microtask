const fs = require('fs');

const folderPath = '../'; // Specify the folder path where your YAML files are located

// Read the YAML files in the specified folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const deploymentYAMLs = [];
  const serviceYAMLs = [];

  // Separate the Deployment and Service YAML files
  files.forEach((file) => {
    if (file.endsWith('-deployment.yml')) {
      deploymentYAMLs.push(file);
    } else if (file.endsWith('-service.yml')) {
      serviceYAMLs.push(file);
    }
  });

  // Combine the Deployment YAML files
  const combinedDeploymentYAML = deploymentYAMLs
    .map((file) => fs.readFileSync(`${folderPath}/${file}`, 'utf8'))
    .join('\n---\n');

  // Combine the Service YAML files
  const combinedServiceYAML = serviceYAMLs
    .map((file) => fs.readFileSync(`${folderPath}/${file}`, 'utf8'))
    .join('\n---\n');

  // Write the combined Deployment and Service YAML files
  fs.writeFileSync(`${folderPath}/combine-yml/combined-deployment.yml`, combinedDeploymentYAML);
  fs.writeFileSync(`${folderPath}/combine-yml/combined-service.yml`, combinedServiceYAML);
});
