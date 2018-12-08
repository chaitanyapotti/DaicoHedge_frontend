import fs from 'fs';
import path from 'path';
const defaultPath = path.resolve(__dirname, '../app/ABIs');

export default name => {
  return new Promise((resolve, reject) => {
    const contractPath = path.resolve(defaultPath, name + '.json');
    if (!fs.existsSync(contractPath))
      reject(new Error("Version doesn't exist"));
    const fileData = fs.readFileSync(contractPath, 'utf8');
    const parsedFile = JSON.parse(fileData);
    resolve({ abi: parsedFile.abi, bytecode: parsedFile.bytecode });
  });
};
