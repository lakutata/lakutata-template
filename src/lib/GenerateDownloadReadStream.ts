import {Readable} from 'stream'

export function GenerateDownloadReadStream(readStream: Readable, filename: string): Readable {
    readStream['filename'] = filename
    return readStream
}
