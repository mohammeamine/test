declare module 'mime-types' {
  /**
   * Lookup the content-type associated with a file.
   */
  export function lookup(path: string): string | false;
  
  /**
   * Get the default charset for a content-type.
   */
  export function charset(type: string): string | false;
  
  /**
   * Get the content-type for a file extension.
   */
  export function contentType(extension: string): string | false;
  
  /**
   * Get the file extension associated with a content-type.
   */
  export function extension(type: string): string | false;
  
  /**
   * Create a full content-type header given a content-type or extension.
   */
  export function contentType(type: string): string | false;
} 