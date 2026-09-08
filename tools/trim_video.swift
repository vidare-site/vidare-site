import Foundation
import AVFoundation

enum TrimError: Error {
  case invalidArguments
  case exportSessionUnavailable
}

let arguments = CommandLine.arguments
guard arguments.count == 5 else {
  fputs("Usage: swift trim_video.swift <input> <output> <startSeconds> <durationOrEnd>\n", stderr)
  throw TrimError.invalidArguments
}

let inputPath = arguments[1]
let outputPath = arguments[2]
let startSeconds = Double(arguments[3]) ?? 0
let durationArgument = arguments[4]

let asset = AVURLAsset(url: URL(fileURLWithPath: inputPath))
guard let exportSession = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetHighestQuality) else {
  throw TrimError.exportSessionUnavailable
}

let outputURL = URL(fileURLWithPath: outputPath)
try? FileManager.default.removeItem(at: outputURL)

let start = CMTime(seconds: startSeconds, preferredTimescale: 600)
let duration: CMTime

if durationArgument == "end" {
  duration = CMTimeSubtract(asset.duration, start)
} else {
  duration = CMTime(seconds: Double(durationArgument) ?? 0, preferredTimescale: 600)
}

exportSession.outputURL = outputURL
exportSession.outputFileType = .mp4
exportSession.timeRange = CMTimeRange(start: start, duration: duration)
exportSession.shouldOptimizeForNetworkUse = true

let semaphore = DispatchSemaphore(value: 0)
exportSession.exportAsynchronously {
  semaphore.signal()
}

semaphore.wait()

if let error = exportSession.error {
  throw error
}

if exportSession.status != .completed {
  throw NSError(domain: "trim_video", code: 1, userInfo: [NSLocalizedDescriptionKey: "Export failed with status \(exportSession.status.rawValue)"])
}

print("Trimmed video written to \(outputPath)")
