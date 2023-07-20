import fs from "node:fs"
import path from "node:path"

export default function viteConfitExtend(options) {
	let _config
	const _options = options
	return {
		name: "index-path-extend",
		configResolved(config) {
			_config = config
		},
		closeBundle() {
			if (_config.command == "build" && _options) {
				if (_options.indexPath && _options.indexName) {
					let filePath = path.resolve(_config.root, _config.build.outDir, _options.indexPath)
					let checkDir = fs.existsSync(filePath)
					if (!checkDir) {
						console.log("目标文件夹不存在，正在尝试创建目标文件夹。")
						let mkDirRes = fs.mkdirSync(path.resolve(_config.root, _config.build.outDir, _options.indexPath), { recursive: false, mode: 0o777 })
						// undefined 表示创建成功
						if (!mkDirRes) {
							console.log("目标文件夹创建成功。")
						} else {
							console.warn("目标文件夹创建失败！")
							return
						}
					}
					fs.renameSync(
						path.resolve(_config.root, _config.build.outDir, "index.html"),
						path.resolve(_config.root, _config.build.outDir, _options.indexPath, _options.indexName)
					)
					console.log(`项目构建完成，index.html已成功移至${_options.indexPath}`)
				}
			}
		},
	};
}