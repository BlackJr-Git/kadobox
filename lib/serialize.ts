export function serializeData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data
  }

  if (data instanceof Date) {
    return data.toISOString() as T
  }

  if (typeof data === "object") {
    if (Array.isArray(data)) {
      return data.map((item) => serializeData(item)) as T
    }

    const serialized: Record<string, unknown> = {}
    for (const key in data) {
      if (
        key !== "_query" &&
        key !== "_queryConfig" &&
        key !== "referencedTable"
      ) {
        serialized[key] = serializeData(data[key])
      }
    }
    return serialized as T
  }

  return data
}
